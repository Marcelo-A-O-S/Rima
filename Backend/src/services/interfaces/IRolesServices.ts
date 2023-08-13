import { Roles } from "../../domain";
import { RolesRepository } from "../repositories";
import { IServices } from "./IServices";

interface IRolesServices extends IServices<Roles> {
    GetRoleByRoleName(roleName: string): Promise<Roles>
}
export { IRolesServices }
