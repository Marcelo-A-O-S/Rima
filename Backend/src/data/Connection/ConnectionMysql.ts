import{ createConnection, Connection, QueryOptions, QueryError } from "mysql2/promise"
//import {} from 'mysql2/promise'

export class ConnectionMysql{
    public connection: Promise<Connection>;
    private host: string = 'localhost'
    private user: string | undefined = process.env.USER_MYSQL;
    private password: string | undefined = process.env.PASSWORD_MYSQL;
    private database: string | undefined = process.env.DATABASE_MYSQL;
    constructor(){
        this.connection = createConnection({
            host: this.host,
            user: this.user,
            password: this.password
        })
    }
    public async verifyDatabaseExists(): Promise<void>{
        let query = `SELECT case when count(*) > 0 then 'true' else 'false' end as 'resultado' FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '${this.database}';`
        const [results]: [Array<any>, any] = await (await this.connection).query(query);
        const result = results[0];
        const resultado = result.resultado;
        if(resultado === 'true'){
            return console.log('Banco de dados já existe, prosseguindo com as proximas configurações')
        }else{
            return this.createDatabase()
        }
    }
    private async createDatabase(): Promise<void>{
        console.log('Banco de dados não existe, criando conexão')
        this.connection = createConnection({
            host: this.host,
            user: this.user,
            password: this.password
          });

          try {
            await (await this.connection).query(`CREATE DATABASE ${this.database}`);
            console.log('Banco de dados criado com sucesso!');

          } catch (error) {
            console.error('Erro ao criar o banco de dados:', error);
          } finally {
            await this.createTables();
            await this.close();
          }
    }
    private async createTables(): Promise<void>{
        try{
            await this.close();
            await this.init();
            await (await this.connection).query(`create table if not exists employees(id int primary key auto_increment not null,firstName varchar(50) not null,lastName varchar(50) not null,email varchar(60) not null);`);
            await (await this.connection).query(`create table if not exists typesRoles(id int primary key auto_increment not null,typeName varchar(50) not null);`);
            await (await this.connection).query(`create table if not exists roles(id int primary key auto_increment not null,roleName varchar(50) not null,typeid int not null,foreign key(typeid) references databasemysql.typesRoles(id) on update cascade on delete cascade);`)
            await (await this.connection).query(`create table if not exists users(id int primary key auto_increment not null,employeeid int not null,passwordHash varchar(255) not null,passwordSalt varchar(70) not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade);`);
            await (await this.connection).query(`create table if not exists employeeRoles(id int primary key auto_increment not null,employeeid int not null,roleid int not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade,foreign key(roleid) references databasemysql.roles(id) on update cascade on delete cascade);`);
            //await (await this.connection).query(``);
        }catch(err){
            console.error(err)

        }finally{
            console.log('Tabela de entidade Employee criada com sucesso')
            console.log('Tabela de entidade Roles criada com sucesso')
        }

    }
    public async init(): Promise<void>{
        try{
            this.connection = createConnection({
                host:this.host,
                user: this.user,
                password: this.password,
                database: this.database
            });
            await (await this.connection).connect();
        }catch(err){
            console.log(err)
        }
    }
    public async close() : Promise<void>{
        await (await this.connection).end()
    }
    public QuerySelectAll(tabela:string): string{
        return `select * from ${tabela}`
    }
    public QueryUpdate(tabela: string, valoresEColunas: string[], referencia:string):string {
        return `update ${tabela} set ${valoresEColunas.join(', ')} where ${referencia};`
    }
    public QueryInsert(tabela: string, colunas: string[], valores: string[]):string{
        return `insert into ${tabela}(${colunas.join(',')}) values (${valores.join(',')});`
    }
    public QuerySelectById(tabela: string, id:number):string{
        return `select * from ${tabela} where id = ${id}`
    }
    public QuerySelectByProperty(tabela:string, property:string, value:string):string{
        return `Select * from ${tabela} where ${property} = ${value}`
    }
    public VerifyValueByPropertyExists(tabela:string,property:string, value:string):string{
        return `select case when count(*) > 0 then "true" else "false" end as resultado from ${tabela} where ${property} = ${value};`
    }
}
