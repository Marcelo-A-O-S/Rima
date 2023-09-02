import { typesRoles } from "../domain/Entities/typesRoles";
import { NameTables } from "../domain/Enums/NameTables";
import { ITypesRolesServices } from "./interfaces/ITypesRolesServices";
import { typesRolesRepository } from "./repositories/TypeRolesRepository";

class typesRolesServices implements ITypesRolesServices{
    private typesRolesRepository: typesRolesRepository;
    constructor(){
        this.typesRolesRepository = new typesRolesRepository();
    }
    async VerifyTypeRoleNameExists(typeName: string): Promise<boolean> {
        try{
            const result = await this.typesRolesRepository.CheckPerProperty(NameTables.TYPESROLES, "typeName", typeName);
            return result
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async GetTypeRoleByTypeName(typeName: string): Promise<typesRoles> {
        let result: any;
        try{
            result = await this.typesRolesRepository.findBy(NameTables.TYPESROLES,'typeName',typeName);
            if(result !== undefined){
                const typerole = new typesRoles();
                typerole.id = result.id;
                typerole.typeName = result.typeName;
                return typerole;
            }
            return result;
        }catch(err){
            throw new Error(`${err}`);
        }
    }
    async Save(roletype: typesRoles): Promise<string> {
        let result: string = ""
        try{
            if(roletype.id === 0){
                await this.typesRolesRepository.save(roletype);
                result = 'Salvo com sucesso!';
            }else{
                await this.typesRolesRepository.update(roletype);
                result = 'Atualizado com sucesso!';
            }
            return result;
        }catch(err){
            throw new Error(`${err}`);
        }
    }
    async GetAll(): Promise<typesRoles[]> {
        let listTypesRoles: typesRoles[] = [];
        let resultTypeRoles: any[] = [];
        try{
            resultTypeRoles = await this.typesRolesRepository.listAll(NameTables.TYPESROLES);
            resultTypeRoles.map(DbtypeRoles =>{
                const typerole = new typesRoles();
                typerole.id = DbtypeRoles.id;
                typerole.typeName = DbtypeRoles.typeName;
                listTypesRoles.push(typerole);
            })
            return listTypesRoles;
        }catch(err){
            throw new Error(`${err}`);
        }
    }
    async GetbyId(id: number): Promise<typesRoles> {
        try{
            const result:any = await this.typesRolesRepository.GetbyId(NameTables.TYPESROLES, id);
            if(result != undefined){
                const typeRole = new typesRoles();
                typeRole.id = result.id;
                typeRole.typeName = result.typeName;
                return typeRole;
            }
            return result;
        }catch(err){
            throw new Error(`${err}`);
        }
    }

}
export { typesRolesServices }
