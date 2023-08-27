import { Roles } from "../../domain/Entities/Roles";
import { RolesRepository } from "../repositories";
import { IServices } from "./IServices";

interface IRolesServices extends IServices<Roles> {
    GetRoleByRoleName(roleName: string): Promise<Roles>;
    VerifyRoleNameExists(roleName:string): Promise<boolean>
}
export { IRolesServices }
