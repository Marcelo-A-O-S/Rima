interface IRoles{
    roleName:string
}


interface IUser {
    firstName: string;
    lastName:string;
    roles:IRoles[];
    token:string
}

export type { IUser }
