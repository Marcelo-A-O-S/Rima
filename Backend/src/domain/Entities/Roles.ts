export interface PropRoles{
    id:number;
    roleName: string;
    typeid:number
}

export class Roles{
    public id: number;
    public roleName: string;
    public typeid: number;
    constructor(prop : PropRoles){
        this.id = prop.id;
        this.roleName = prop.roleName;
        this.typeid = prop.typeid;
    }
}
