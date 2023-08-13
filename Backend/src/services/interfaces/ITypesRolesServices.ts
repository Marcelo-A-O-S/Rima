import { typesRoles } from "../../domain/Entities/typesRoles";
import { IServices } from "./IServices";

interface ITypesRolesServices extends IServices<typesRoles>{
    GetTypeRoleByTypeName(typeName:string): Promise<typesRoles>
}
export { ITypesRolesServices }
