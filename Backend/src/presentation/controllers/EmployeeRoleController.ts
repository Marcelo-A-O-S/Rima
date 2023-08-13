import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IEmployeeRoleController } from "./interfaces/IEmployeeRoleController";
import { IEmployeeRoleServices } from "../../services/interfaces/IEmployeeRoleServices";
import { EmployeeRoleServices } from "../../services/EmployeeRoleServices";
import { createSchema, idSchema, updateSchema } from "./Schema/EmployeeRoleSchema";
import { EmployeeRole } from "../../domain/Entities/EmployeeRole";

class EmployeeRoleController implements IEmployeeRoleController{
    private employeeRoleServices: IEmployeeRoleServices;
    constructor(){
        this.employeeRoleServices = new EmployeeRoleServices();
    }
    async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await createSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { employeeid, roleid } = resultSchema.data;
            const employeeRole = new EmployeeRole();
            employeeRole.employeeid = employeeid;
            employeeRole.roleid = roleid;
            const result = await this.employeeRoleServices.Save(employeeRole);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await updateSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id, employeeid, roleid } = resultSchema.data;
            const employeeRole = new EmployeeRole();
            employeeRole.id = id;
            employeeRole.employeeid = employeeid;
            employeeRole.roleid = roleid;
            const result = await this.employeeRoleServices.Save(employeeRole);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const list = await this.employeeRoleServices.GetAll();
        return res.json(list);
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    async getId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await idSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const {id} = resultSchema.data;
            const employeeRole = await this.employeeRoleServices.GetbyId(id);
            return res.json(employeeRole);
        }
        return res.json(resultSchema.error);
    }

}
export { EmployeeRoleController }
