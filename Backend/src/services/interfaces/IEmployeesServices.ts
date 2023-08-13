import { Employees } from "../../domain/Entities/Employees";
import { IServices } from "./IServices";

interface IEmployeesServices extends IServices<Employees> {
    GetByEmail(email: string): Promise<Employees>;
    VerifyEmailExists(email:string): Promise<boolean>
}
export { IEmployeesServices }
