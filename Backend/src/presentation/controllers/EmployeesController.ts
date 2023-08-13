import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IEmployeesController } from "./interfaces/IEmployeesController";
import { IEmployeesServices } from "../../services/interfaces/IEmployeesServices";
import { EmployeesServices } from "../../services/EmployeesServices";
import { createSchema, idSchema, updateSchema } from "./Schema/EmployeesSchema";
import { Employees } from "../../domain/Entities/Employees";

class EmployeesController implements IEmployeesController {
    private employeesServices: IEmployeesServices;
    constructor(){
        this.employeesServices = new EmployeesServices();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getId = this.getId.bind(this);
    }
    async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await createSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const {email,firstName,lastName} = resultSchema.data;
            const exists = await this.employeesServices.VerifyEmailExists(email);
            if(exists === false){
                const employee = new Employees();
                employee.id = 0;
                employee.email = email;
                employee.firstName = firstName;
                employee.lastName = lastName;
                const result = await this.employeesServices.Save(employee);
                return res.json(result);
            }
            return res.json("Email inválido!");
        }
        return res.json(resultSchema.error);
    }
    async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await updateSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { email, firstName, id, lastName } = resultSchema.data;
            const employee = await this.employeesServices.GetByEmail(email);
            if(employee !== undefined){
                employee.id = id;
                employee.email = email;
                employee.firstName = firstName;
                employee.lastName = lastName;
                const result = await this.employeesServices.Save(employee);
                return res.json(result);
            }
            return res.json("Nenhum registro encontrado");
        }
        return res.json(resultSchema.error);
    }
    async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const list = await this.employeesServices.GetAll();
        if(list.length !== 0){
            return res.json(list)
        }
        return res.json("Nada Encontrado");

    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    async getId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await idSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id } = resultSchema.data;
            const employee = await this.employeesServices.GetbyId(id);
            if(employee != undefined){
                return res.json(employee);
            }
            return res.json("Nada encontrado!");
        }
        return res.json(resultSchema.error)
    }

}

export { EmployeesController }
