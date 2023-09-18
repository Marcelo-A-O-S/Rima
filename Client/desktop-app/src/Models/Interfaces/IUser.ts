interface IRoles{
    roleName:string
}


interface IUser {
    firstName: string;
    lastName:string;
    roles:IRoles[];
}

export type { IUser }
