import * as crypto from 'crypto'
import { AlgoritmoHash } from '../Enums/AlgoritmoHash';
import { Format } from '../Enums/Format';
class Users{
    id:number;
    employeeid:number;
    passwordHash:string;
    passwordSalt:string;
    constructor(){
        this.id= 0;
        this.employeeid= 0;
        this.passwordHash = "";
        this.passwordSalt = "";
    }
    private createPasswordSalt(){
        let length = 16;
        this.passwordSalt = crypto.randomBytes(Math.ceil(length/2)).toString(Format.Hex).slice(0,length)
    }
    createPasswordHash(password:string){
        this.createPasswordSalt();
        const hash = crypto.createHash(AlgoritmoHash.SHA256);
        const hashIcludeSalt = this.passwordSalt + password;
        hash.update(hashIcludeSalt)
        this.passwordHash = hash.digest(Format.Hex)
    }
    verifyPasswordHash(password:string):boolean{
        const hash = crypto.createHash(AlgoritmoHash.SHA256);
        const hashIcludeSalt = this.passwordSalt + password;
        hash.update(hashIcludeSalt)
        const passwordHashCurrent = hash.digest(Format.Hex)
        if(this.passwordHash === passwordHashCurrent){
            return true
        }else{
            return false
        }

    }
}
export { Users }
