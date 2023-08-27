import { Users } from "../domain/Entities/Users";
import { NameTables } from "../domain/Enums/NameTables";
import { IUsersServices } from "./interfaces/IUsersServices";
import { UsersRepository } from "./repositories/UsersRepository";

class UsersServices implements IUsersServices{
    private usersRepository: UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }
    async Save(entity: Users): Promise<string> {
        let result: string = ""
        try{
            if(entity.id === 0){
                await this.usersRepository.save(entity)
                result = 'Salvo com sucesso!'
            }else{
                await this.usersRepository.update(entity)
                result = 'Atualizado com sucesso!'
            }
            return result
        }catch(err){
            return `${err}`
        }
    }
    async GetAll(): Promise<Users[]> {
        let list : Users[] = [];
        try{
            const result = await this.usersRepository.listAll(NameTables.USERS);
            if(result != undefined){
                result.map(obj=>{
                    const user = new Users();
                    user.id = obj.id;
                    user.employeeid = obj.employeeid;
                    user.passwordHash = obj.passwordHash;
                    user.passwordSalt = obj.passwordSalt;
                    list.push(user);
                })
                return list
            }
            return result

        }catch(err){
            throw new Error(`${err}`)
        }
    }
    GetbyId(id: number): Promise<Users> {
        throw new Error("Method not implemented.");
    }

}
export { UsersServices }
