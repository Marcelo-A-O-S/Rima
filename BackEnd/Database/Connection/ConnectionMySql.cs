using Database.Connection.Interface;

using MySql.Data.MySqlClient;
using System.Data.Common;
using System.Reflection;

namespace Database.Connection
{
    public class ConnectionMySql : IConnectionMySql
    {
        private MySqlConnection connection { get; set; }
        private MySqlCommand command { get; set; }
        private DbDataReader reader { get; set; }
        private string host { get; set; }
        private string user { get; set; }
        private string password { get; set; }
        private string database { get; set; } = "databasemysql";

        public ConnectionMySql()
        {

        }
        public async Task Init()
        {
            this.connection = new MySqlConnection($"Server=localhost;Database={this.database};Uid=root;Pwd=123456;");
            await this.connection.OpenAsync();
        }
        public async Task VerifyDatabaseExists()
        {
            try
            {
                this.connection = new MySqlConnection("Server=localhost;Database=mysql;Uid=root;Pwd=123456;");
                this.connection.Open();
                using( this.command = new MySqlCommand($"SELECT case when count(*) > 0 then 'true' else 'false' end as 'resultado' FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = @database;", this.connection))
                {
                    
                    this.command.Parameters.AddWithValue("@database", this.database);
                    using (var reader = this.command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            if (reader["resultado"].ToString() == "false")
                            {
                                reader.Close();
                                this.command.Dispose();
                                this.connection.Close();
                                await this.CreateDatabase();

                            }
                            else
                            {
                                Console.WriteLine("Banco de dados já existe, prosseguindo com as proximas configurações!");
                            }
                        }
                    }
                }
                
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        private async Task CreateDatabase()
        {
            try
            {
                string StringConnection = $"Server=localhost;Database=mysql;Uid=root;Pwd=123456;";
                this.connection = new MySqlConnection(StringConnection);
                this.connection.Open();
                using (this.command = new MySqlCommand($"CREATE DATABASE {this.database};", this.connection))
                {
                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected == 1)
                    {
                        Console.WriteLine("Banco de dados criado com sucesso.");
                        this.command.Dispose();
                        this.connection.Close();
                        await this.CreateTables();
                        
                    }
                    else
                    {
                        Console.WriteLine("Erro ao criar o banco de dados.");
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private async Task CreateTables()
        {
            try
            {
                string StringConnection = $"Server=localhost;Database={this.database};Uid=root;Pwd=123456;";
                this.connection = new MySqlConnection(StringConnection);
                this.connection.Open();
                string[] querys = {
                    "create table if not exists employees(id int primary key auto_increment not null, code varchar(255) not null, firstName varchar(50) not null,lastName varchar(50) not null);",
                    "create table if not exists typesroles(id int primary key auto_increment not null,typeName varchar(50) not null);",
                    "create table if not exists roles(id int primary key auto_increment not null,roleName varchar(50) not null,typeid int not null,foreign key(typeid) references databasemysql.typesroles(id) on update cascade on delete cascade);",
                    "create table if not exists users(id int primary key auto_increment not null,employeeid int not null,email varchar(60) not null,passwordHash varchar(255) not null,passwordSalt varchar(255) not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade);",
                    "create table if not exists employeeRoles(id int primary key auto_increment not null,employeeid int not null,roleid int not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade,foreign key(roleid) references databasemysql.roles(id) on update cascade on delete cascade);"
                };
                foreach (var query in querys)
                {
                    using (this.command = new MySqlCommand(query, this.connection))
                    {

                        int result = this.command.ExecuteNonQuery();
                        if (result == 0)
                        {

                            this.command.Dispose();
                        }
                        else
                        {
                            Console.WriteLine("Erro ao criar tabela no banco de dados.");
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public async Task InsertCommand(string command)
        {
            this.command = new MySqlCommand(command, this.connection);
        }
        public async Task ExecuteReaderQuery()
        { 
            this.reader = await this.command.ExecuteReaderAsync();
        }
        public async Task ExecuteScalarQuery()
        {
            await this.command.ExecuteScalarAsync();
        }
        public async Task ExecuteNonQuery()
        {
            await this.command.ExecuteNonQueryAsync();
        }
        public async Task CommandClose()
        {
            await this.command.DisposeAsync();
        }
        public async Task ConnectClose()
        {
            await this.connection.CloseAsync();
        }
        public string QueryInsert(string table, List<string> fields, List<string> values)
        {
            var commandText = "insert into {0} ({1}) values({2});";
            return String.Format(commandText, table.ToLower(), String.Join(",", fields.ToArray()), String.Join(",", values.ToArray()));
        }
        public string QueryCheckValueExists(string table, string propertyName, string value)
        {
            var commandText = "SELECT case when count(*) > 0 then 'true' else 'false' end as resultado FROM {0} where {1} like '%{2}%';";
            return String.Format(commandText, table.ToLower(), propertyName, value);
        }
        public async Task ReaderReturnExecuteQuery(object entity)
        {
            var properties = entity.GetType().GetProperties();
            foreach(var item in properties)
            {
                Console.WriteLine(item.Name);
            }
        }

        public async Task<string> ReturnUniqueReaderData()
        {
            var result = "";
            while(await this.reader.ReadAsync())
            {
                result = this.reader.GetString(0);
                return result; 
            }
            return result;
        }
        public string QuerySelectAll(string Table)
        {
            return String.Format("Select * from {0};", Table);
        }
        public string QuerySelectByProperty(string Table, string property, string value)
        {
            return String.Format("Select * from {0} where {1} = {2} limit 1;",Table,property,value);
        }
        public string QuerySelectAllByProperty(string table, string property, string value)
        {
            return String.Format("Select * from {0} where {1} = {2};", table, property, value);
        }
        public string QuerySelectById(string table, string id)
        {
            return String.Format("Select * from {0} where id = {1} limit 1", table, id);
        }
        public Task ReturnListOfReaderData()
        {

            throw new NotImplementedException();
        }

        public async Task<T> FilterReaderObject<T>()
        {
            Type type = typeof(T);

            var obj = (T)Activator.CreateInstance(type);
            while(await this.reader.ReadAsync())
            {
                var props = obj.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
                foreach (var prop in props)
                {
                    prop.SetValue(obj, reader[prop.Name]);
                }
            }
            return obj;
        }
        public async Task<List<T>> FilterReaderListObject<T>()
        {
            Type type = typeof(T);
            
            var listObj = new List<T>();
            while(await this.reader.ReadAsync())
            {
                var obj = (T)Activator.CreateInstance(type);
                var props = obj.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
                foreach (var prop in props)
                {
                    prop.SetValue(obj, reader[prop.Name]);
                }
                listObj.Add(obj);
            }
            return listObj;
        }
    }
}
