import { ConnectionMysql } from './ConnectionMysql'

export * from './ConnectionSqlite'


export const startDatabase = async () =>{
    await CreateDatabase();
}
const CreateDatabase = async () =>{
    const connection = new ConnectionMysql();
    await connection.verifyDatabaseExists();
}
