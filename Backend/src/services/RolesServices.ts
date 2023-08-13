import { any } from "zod";
import { Roles } from "../domain";
import { NameTables } from "../domain/Enums/NameTables";
import { IRolesServices } from "./interfaces";
import { RolesRepository } from "./repositories";


class RolesServices implements IRolesServices{
    private roleRepository : RolesRepository
    constructor(){
        this.roleRepository = new RolesRepository();
    }
    async GetRoleByRoleName(roleName: string): Promise<Roles> {
        let result: any;
        try{
            result = await this.roleRepository.findBy(NameTables.ROLES, 'roleName', roleName);
            if(result !== undefined){
                const role = new Roles({
                    id: result.id,
                    roleName: result.roleName,
                    typeid: result.typeid
                })
                return role
            }
            return result
        }catch(err){
            throw new Error(`${err}`);
        }
        throw new Error("Method not implemented.");
    }
    async GetbyId(id: number): Promise<Roles> {
        try{
            const result: any = await this.roleRepository.GetbyId(NameTables.ROLES, id);
            if(result !== undefined){
                const role = new Roles({
                    id: result.id,
                    roleName: result.roleName,
                    typeid: result.typeid
                })
                return role
            }
            return result
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async GetAll(): Promise<Roles[]> {
        let resultRoles: any[] = [];
        let listRoles: Roles[] = [];
        try{
            resultRoles =  await this.roleRepository.listAll(NameTables.ROLES);
            resultRoles.map(Dbroles => {
                const roles = new Roles({
                    id: Dbroles.id,
                    roleName: Dbroles.roleName,
                    typeid: Dbroles.typeid
                });
                listRoles.push(roles);
            })
            return listRoles
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async Save(entity: Roles): Promise<string> {
        let result: string = ""
        try{
            if(entity.id === 0){
                await this.roleRepository.save(entity)
                result = 'Salvo com sucesso!'
            }else{
                await this.roleRepository.update(entity)
                result = 'Atualizado com sucesso!'
            }
            return result
        }catch(err){
            return `${err}`
        }
    }

}
export { RolesServices }
