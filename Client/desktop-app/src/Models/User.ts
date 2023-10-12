import { Roles } from "./Roles";
class User{
    public firstName: string = "";
    public lastName:string = "";
    public email:string = "";
    public roles:Roles[] = [];
    public token:string = "";
}
export { User }
