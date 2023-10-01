using Database.Connection.Interface;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace Database.Connection
{
    public class Connection : IConnection
    {
        private MySqlConnection connection { get; set; }
        private MySqlCommand command { get; set; }
        private string host { get; set; }
        private string user { get; set; }
        private string password { get; set; }
        private string database { get; set; } = "databasemysql";

        public Connection()
        {

        }
        public void Init()
        {
            using (var connection = new MySqlConnection()){

            }
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
                            Console.WriteLine(reader.GetString(0));
                            Console.WriteLine(reader["resultado"]);
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
                    "create table if not exists users(id int primary key auto_increment not null,employeeid int not null,email varchar(60) not null,passwordHash varchar(255) not null,passwordSalt varchar(70) not null,foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade);",
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
    }
}
