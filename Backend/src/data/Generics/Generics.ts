import {   OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { ConnectionMysql } from "../Connection/ConnectionMysql";
import { IGenerics } from "./Interfaces/IGenerics";
import { GenericResult } from "./Enums/GenericResult";



export class Generics<T> implements IGenerics<T>{
    async CheckPerProperty(tabela: string, property: string, value: any): Promise<boolean> {
        try{
            let valueString = "";
            if(typeof(value) === 'number'){
                valueString = `${value}`
            }
            if(typeof(value) === 'string'){
                valueString = `"${value}"`
            }
            const conn = new ConnectionMysql();
            let query = conn.VerifyValueByPropertyExists(tabela,property, valueString);
            const [result]:[any[], any] = await (await conn.connection).query(query);
            await conn.close();
            return result[0];
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async GetbyId(tabela: string, id: number): Promise<object> {
        const conn = new ConnectionMysql();
        let query = conn.QuerySelectById(tabela , id);
        await conn.init()
        const [row]:[any[], any] = await (await conn.connection).execute(query)
        await conn.close();
        return row[0]
    }
    async findBy( NameTable: string, property: string, value:any): Promise<object> {
        let result:any[]=[];
        let tabela = NameTable.toLowerCase();
        let valueString = "";
        if(typeof(value) === 'number'){
            valueString = `${value}`
        }
        if(typeof(value) === 'string'){
            valueString = `"${value}"`
        }
        try{
            const conn = new ConnectionMysql();
            let query = conn.QuerySelectByProperty(tabela,property,valueString);
            await conn.init();
            const [result]:[any[], any] = await (await conn.connection).query(query);
            await conn.close();
            return result[0]
        }catch(err){
            console.error(`${err}`)
            return result[0]
        }
    }
    async save(entity: object): Promise<string> {
        let tabela = entity.constructor.name.toLowerCase();
        let valores: any[] = []
        let colunas: string[] = []
        const objCurrent = Object.assign(entity,entity)
        const properties = Object.getOwnPropertyNames(entity);
        properties.forEach((element:string, index:number)=>{
            if(element !== 'id'){
                colunas.push(element)
                let valorCurrent = Reflect.get(objCurrent,element)
                if(typeof(valorCurrent) === 'string'){
                    valores.push(`"${valorCurrent}"`)
                }
                if(typeof(valorCurrent) === 'number'){
                    valores.push(`${valorCurrent}`)
                }
            }
        })
        try{
            const conn = new ConnectionMysql();
            let query = conn.QueryInsert(tabela,colunas,valores);
            await conn.init();
            const [results] = await (await conn.connection).execute(query);
            console.log('Registro inserido com sucesso!');
            console.log('Resultado:', results);

            await conn.close();
            console.log('Query executada no banco de dados: ' + query);
            return GenericResult.Sucess;
        }catch(err){
            console.error(`${err}`)
            return GenericResult.Fail
        }

    }
    async listAll(tabela:string): Promise<Array<any>> {
        let rows: any[] = []
        try{
            const conn = new ConnectionMysql();
            let query = conn.QuerySelectAll(tabela);
            await conn.init();
            const [rows, fields]: [Array<any>, any] = await (await conn.connection).execute(query);
            console.log('Resultados:', rows);
            console.log('Campos:', fields);
            await conn.close();
            return rows
        }catch(err){
            console.error(`${err}`);
            return rows
        }
    }
    async update(entity:object): Promise<string> {
        let tabela = entity.constructor.name.toLowerCase();
        let referencia = "";
        let valoresEColunas: string[] = [];
        const properties = Object.getOwnPropertyNames(entity);
        properties.forEach((element:string, index:number)=>{
            if(element === 'id'){
                referencia = ` ${element} = ${Reflect.get(entity,element)}`
            }else{
                let valorCurrent = Reflect.get(entity,element)
                if(typeof(valorCurrent) === 'string'){
                    valoresEColunas.push(` ${element} = "${valorCurrent}"`)
                }
                if(typeof(valorCurrent) === 'number'){
                    valoresEColunas.push(`${element} = ${valorCurrent}`)
                }
            }

        })
        try{
            const conn = new ConnectionMysql();
            let query = conn.QueryUpdate(tabela,valoresEColunas, referencia)
            await conn.init();
            const [results] =  await (await conn.connection).execute(query);
            console.log('Registro atualizado com sucesso!');
            console.log('Resultado:', results);

            await conn.close();
            console.log('Query executada no banco de dados: ' + query);
            return GenericResult.Sucess;
        }catch(err){
            console.error(`${err}`)
            return GenericResult.Fail
        }

    }

}
