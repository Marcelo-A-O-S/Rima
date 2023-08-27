import { typesRoles } from "../../domain/Entities/typesRoles";
import { IServices } from "./IServices";

interface ITypesRolesServices extends IServices<typesRoles>{
    GetTypeRoleByTypeName(typeName:string): Promise<typesRoles>
    VerifyTypeRoleNameExists(typeName:string): Promise<boolean>
}
export { ITypesRolesServices }
