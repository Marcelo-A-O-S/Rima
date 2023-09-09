from mysql.connector import connect, Error

class ConnectionMysql:
    connection: any;
    host:str = 'localhost';
    user:str = 'root';
    password:str = '123456';
    database:str = 'databasemysql';
    cursor:any;
    def __init__(self) -> None:
        self.connection = connect(
            host = self.host,
            user = self.user,
            password = self.password,
            database = 'mysql'
        );
    async def connect(self):
        self.connection = connect(
            host = self.host,
            user = self.user,
            password = self.password,
            database = self.database
        );
    async def verifyDatabaseExists(self):
        try:
            query = "SELECT case when count(*) > 0 then 'true' else 'false' end as 'resultado' FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '{}';".format(self.database);
            await self.Cursor();
            await self.execute(query);
            resultado = self.cursor.fetchall();
            if(resultado[0]['resultado'] == 'true'):
                await self.close();
                return print('Banco de dados já existe, prosseguindo com as proximas configurações')
            else:
                await self.createDatabase();#await self.createDatabase();
        except Error as e:
            print('Erro no banco de dados: ', e.msg);

    async def createDatabase(self):
        try:
            print('Banco de dados não existe, criando conexão');
            await self.execute("CREATE DATABASE {}".format(self.database));
            print('Banco de dados criado com sucesso!');
        except Error as e:
            print('Erro no banco de dados: ', e.msg);
            await self.close();
        finally:
            await self.createTables();
            await self.close();
    async def createTables(self):
        try:
            #await self.close();
            await self.init();
            await self.execute("create table if not exists employees(id int primary key auto_increment not null,firstName varchar(50) not null,lastName varchar(50) not null,email varchar(60) not null);");
            await self.execute("create table if not exists typesRoles(id int primary key auto_increment not null,typeName varchar(50) not null);");
            await self.execute("create table if not exists roles(id int primary key auto_increment not null,roleName varchar(50) not null,typeid int not null,foreign key(typeid) references databasemysql.typesRoles(id) on update cascade on delete cascade);")
            await self.execute("create table if not exists users(id int primary key auto_increment not null,employeeid int not null,passwordHash varchar(255) not null,passwordSalt varchar(70) not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade);")
            await self.execute("create table if not exists employeeRoles(id int primary key auto_increment not null,employeeid int not null,roleid int not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade,foreign key(roleid) references databasemysql.roles(id) on update cascade on delete cascade);")
        except Error as e:
            print("Erro no banco de dados: ", e.msg)

    async def Cursor(self):
        try:
            self.cursor = self.connection.cursor(dictionary=True);
        except Error as e:
            print('Erro no banco de dados: ', e.msg);

    async def init(self):
        await self.connect();
        await self.Cursor();

    async def execute(self, query:str):
        self.cursor.execute(query);
        #self.connection.commit();
    async def executeAndCommit(self, query:str):
        self.cursor.execute(query);
        self.connection.commit();
    async def close(self):
        self.cursor.close();
        self.connection.close();

    def QuerySelectAll(self, tabela:str)-> str:
        return 'select * from {}'.format(tabela);
    def QueryInsert(self, tabela:str ,colunas:str,values:str)->str:
        return "insert into {} ({}) values({});".format(tabela,colunas.rstrip(colunas[-1]),values.rstrip(values[-1]));
    def QueryUpdate(self, tabela, corpo,referencia):
        return 'update {} set {} where {}'.format(tabela, corpo.rstrip(corpo[-1]), referencia)
    def QueryFindById(self, tabela, id):
        return "select * from {} where id={} limit 1;".format(tabela, id);
    def QueryDeleteById(self,tabela,id):
        return "delete from {} where id= {}".format(tabela, id);
    def QuerySelecById(self, tabela, id):
        return 'select * from {} where id= {};'.format(tabela,id);
    def QuerySelectByProperty(self,tabela, property, value):
        return 'Select * from {} where {} = {};'.format(tabela, property, value);
    def VerifyValueByPropertyExists(self,tabela:str, property:str,  value:str):
        return 'select case when count(*) > 0 then "True" else "False" end as resultado from {} where {} = {};'.format(tabela, property, value);
