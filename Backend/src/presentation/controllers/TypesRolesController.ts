import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ITypesRolesController } from "./interfaces/ITypesRolesController";
import { ITypesRolesServices } from "../../services/interfaces/ITypesRolesServices";
import { typesRolesServices } from "../../services/typeRolesServices";

import { typesRoles } from "../../domain/Entities/typesRoles";
import { IdSchema, TypeNameSchema, createSchema, updateSchema } from "./Schema/TypesRolesSchema";

class TypesRolesController implements ITypesRolesController{
    private typesRolesServices: ITypesRolesServices;
    constructor(){
        this.typesRolesServices = new typesRolesServices();
        this.GetByTypeName = this.GetByTypeName.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.getId = this.getId.bind(this);
        this.update = this.update.bind(this);
    }
    async GetByTypeName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await TypeNameSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { typeName } = resultSchema.data;
            const typeRole = this.typesRolesServices.GetTypeRoleByTypeName(typeName);
            return res.json(typeRole);
        }
        return res.json(resultSchema.error);
    }
    async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await createSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { typeName } = resultSchema.data;
            const typeRole = new typesRoles();
            typeRole.id = 0;
            typeRole.typeName = typeName;
            const result = await this.typesRolesServices.Save(typeRole);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await updateSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id, typeName } = resultSchema.data;
            const typeRole = new typesRoles();
            typeRole.id = id;
            typeRole.typeName = typeName;
            const result = await this.typesRolesServices.Save(typeRole);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const list =  await this.typesRolesServices.GetAll();
        if(list.length !== 0 ){
            return res.json(list);
        }
        return res.json("Nada Encontrado!");
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    async getId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await IdSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id } = resultSchema.data;
            const typeRole = this.typesRolesServices.GetbyId(id);
            if(typeRole !== undefined){
                return res.json(typeRole);
            }
            return res.json("Nada encontrado");
        }
        return res.json(resultSchema.error);
    }

}
export { TypesRolesController }
