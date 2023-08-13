export interface IGenerics<T>{
    update(obj:object):Promise<string>;
    listAll(tabela:string):Promise<object[]>;
    save(obj:object):Promise<string>;
    findBy( NameTable: string, property: string, value: any):Promise<object>;
    GetbyId(tabela:string, id:number): Promise<object>
    CheckPerProperty(tabela:string, property: string, value:any ):Promise<boolean>
}
