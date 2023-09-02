"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMysql = void 0;
const promise_1 = require("mysql2/promise");
//import {} from 'mysql2/promise'
class ConnectionMysql {
    constructor() {
        this.host = 'localhost';
        this.user = process.env.USER_MYSQL;
        this.password = process.env.PASSWORD_MYSQL;
        this.database = process.env.DATABASE_MYSQL;
        this.connection = (0, promise_1.createConnection)({
            host: this.host,
            user: this.user,
            password: this.password
        });
    }
    verifyDatabaseExists() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT case when count(*) > 0 then 'true' else 'false' end as 'resultado' FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '${this.database}';`;
            const [results] = yield (yield this.connection).query(query);
            const result = results[0];
            const resultado = result.resultado;
            if (resultado === 'true') {
                return console.log('Banco de dados já existe, prosseguindo com as proximas configurações');
            }
            else {
                return this.createDatabase();
            }
        });
    }
    createDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Banco de dados não existe, criando conexão');
            this.connection = (0, promise_1.createConnection)({
                host: this.host,
                user: this.user,
                password: this.password
            });
            try {
                yield (yield this.connection).query(`CREATE DATABASE ${this.database}`);
                console.log('Banco de dados criado com sucesso!');
            }
            catch (error) {
                console.error('Erro ao criar o banco de dados:', error);
            }
            finally {
                yield this.createTables();
                yield this.close();
            }
        });
    }
    createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.close();
                yield this.init();
                yield (yield this.connection).query(`create table if not exists employee(id int primary key auto_increment not null,firstName varchar(50) not null,lastName varchar(50) not null,email varchar(60) not null,passwordHash varchar(255) not null,passwordSalt varchar(70) not null);`);
                yield (yield this.connection).query(`create table if not exists roles(id int primary key auto_increment not null,roleName varchar(50) not null);`);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                console.log('Tabela de entidade Employee criada com sucesso');
                console.log('Tabela de entidade Roles criada com sucesso');
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = (0, promise_1.createConnection)({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });
                yield (yield this.connection).connect();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.connection).end();
        });
    }
    QuerySelectAll(tabela) {
        return `select * from ${tabela}`;
    }
    QueryUpdate(tabela, valoresEColunas, referencia) {
        return `update ${tabela} set ${valoresEColunas.join(', ')} where ${referencia};`;
    }
    QueryInsert(tabela, colunas, valores) {
        return `insert into ${tabela}(${colunas.join(',')}) values (${valores.join(',')});`;
    }
    QuerySelectById(tabela, id) {
        return `select * from ${tabela} where id = ${id}`;
    }
}
exports.ConnectionMysql = ConnectionMysql;
//# sourceMappingURL=ConnectionMysql.js.map