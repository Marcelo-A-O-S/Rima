import { EmployeeRoles } from "../domain/Entities/EmployeeRole";
import { NameTables } from "../domain/Enums/NameTables";
import { IEmployeeRoleServices } from "./interfaces/IEmployeeRoleServices";
import { EmployeeRoleRepository } from "./repositories/EmployeeRoleRepository";

class EmployeeRoleServices implements IEmployeeRoleServices{
    private employeeRoleRepository: EmployeeRoleRepository;
    constructor(){
        this.employeeRoleRepository = new EmployeeRoleRepository();
    }
    async Save(entity: EmployeeRoles): Promise<string> {
        let result: string = "";
        try{
            if(entity.id === 0){
                await this.employeeRoleRepository.save(entity);
                result = 'Salvo com sucesso!';
            }else{
                await this.employeeRoleRepository.update(entity);
                result = 'Atualizado com sucesso!';
            }
            return result;
        }catch(err){
            throw new Error(`${err}`);
        }
    }
    async GetAll(): Promise<EmployeeRoles[]> {
        let result: any[] = [];
        let list:EmployeeRoles[] = [];
        try{
            result = await this.employeeRoleRepository.listAll(NameTables.EMPLOYEEROLES);
            if(result !== undefined){
                result.map(obj =>{
                    const employeeRole = new EmployeeRoles();
                    employeeRole.id = obj.id;
                    employeeRole.employeeid = obj.employeeid;
                    employeeRole.roleid = obj.roleid;
                    list.push(employeeRole);
                })
                return list;
            }
            return list;
        }catch(err){
            throw new Error("Method not implemented.");
        }

    }
    async GetbyId(id: number): Promise<EmployeeRoles> {
        try{
            const result:any = await this.employeeRoleRepository.GetbyId(NameTables.EMPLOYEEROLES, id);
            if(result != undefined){
                const employeeRole = new EmployeeRoles();
                employeeRole.id = result.id;
                employeeRole.employeeid = result.employeeid;
                employeeRole.roleid = result.roleid;
                return employeeRole;
            }
            return result;
        }catch(err){
            throw new Error("Method not implemented.");
        }
    }

}
export { EmployeeRoleServices }
