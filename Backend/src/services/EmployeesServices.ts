import { Employees } from "../domain/Entities/Employees";
import { NameTables } from "../domain/Enums/NameTables";
import { IEmployeesServices } from "./interfaces/IEmployeesServices";
import { EmployeesRepository } from "./repositories/EmployeesRepository";

class EmployeesServices implements IEmployeesServices{
    private employeesRepository: EmployeesRepository;
    constructor(){
        this.employeesRepository = new EmployeesRepository();
    }
    async VerifyEmailExists(email: string): Promise<boolean> {
        let result: any;
        try{
            result = await this.employeesRepository.findBy(NameTables.EMPLOYEE, 'email', email);
            if(result !== undefined){
                return true
            }
            return false
        }catch(err){
            throw new Error();
        }
    }
    async GetByEmail(email: string): Promise<Employees> {
        let result: any;
        try{
            result = await this.employeesRepository.findBy(NameTables.EMPLOYEE, 'email', email);
            if(result !== undefined){
                const employee = new Employees();
                return employee
            }
            return result
        }catch(err){
            throw new Error();
        }
    }
    async Save(entity: Employees): Promise<string> {
        let result: string = ""
        try{
            if(entity.id === 0){
                await this.employeesRepository.save(entity)
                result = 'Salvo com sucesso!'
            }else{
                await this.employeesRepository.update(entity)
                result = 'Atualizado com sucesso!'
            }
            return result
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async GetAll(): Promise<Employees[]> {
        let result : any[] = [];
        let listEmployees : Employees[] = [];
        try{
            result = await this.employeesRepository.listAll(NameTables.EMPLOYEE);
            result.map( Dbemployee =>{
                const employee = new Employees();
                employee.email = Dbemployee.email;
                employee.firstName = Dbemployee.firstName;
                employee.lastName = Dbemployee.lastName;
                employee.id = Dbemployee.id;
                listEmployees.push(employee);
            })
            return listEmployees;

        }catch(err){
            throw new Error(`${err}`);
        }
    }
    async GetbyId(id: number): Promise<Employees> {
        try{
            const result:any = await this.employeesRepository.GetbyId(NameTables.EMPLOYEE, id);
            if(result !== undefined){
                const employee = new Employees();
                employee.id = result.id;
                employee.firstName = result.firstName;
                employee.email = result.email;
                employee.lastName = result.lastName;
                return employee;
            }
            return result
        }catch(err){
            throw new Error("Method not implemented.");
        }
    }

}
export { EmployeesServices }
