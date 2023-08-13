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
exports.Generics = void 0;
const ConnectionMysql_1 = require("../Connection/ConnectionMysql");
const GenericResult_1 = require("./Enums/GenericResult");
class Generics {
    findBy(property, obj) {
        throw new Error("Method not implemented.");
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let tabela = entity.constructor.name.toLowerCase();
            let valores = [];
            let colunas = [];
            const objCurrent = Object.assign(entity, entity);
            const properties = Object.getOwnPropertyNames(entity);
            properties.forEach((element, index) => {
                if (element !== 'id') {
                    colunas.push(element);
                    let valorCurrent = Reflect.get(objCurrent, element);
                    if (typeof (valorCurrent) === 'string') {
                        valores.push(`"${valorCurrent}"`);
                    }
                    if (typeof (valorCurrent) === 'number') {
                        valores.push(`${valorCurrent}`);
                    }
                }
            });
            try {
                const conn = new ConnectionMysql_1.ConnectionMysql();
                let query = conn.QueryInsert(tabela, colunas, valores);
                conn.init();
                const [results] = yield (yield conn.connection).execute(query);
                console.log('Registro inserido com sucesso!');
                console.log('Resultado:', results);
                conn.close();
                console.log('Query executada no banco de dados: ' + query);
                return GenericResult_1.GenericResult.Sucess;
            }
            catch (err) {
                console.error(`${err}`);
                return GenericResult_1.GenericResult.Fail;
            }
        });
    }
    listAll(tabela) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = new ConnectionMysql_1.ConnectionMysql();
                let query = conn.QuerySelectAll(tabela);
                yield conn.init();
                const [rows, fields] = yield (yield conn.connection).execute(query);
                console.log('Resultados:', rows);
                console.log('Campos:', fields);
                yield conn.close();
                return rows;
            }
            catch (err) {
                console.error(`${err}`);
            }
            throw new Error("Method not implemented.");
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let tabela = entity.constructor.name.toLowerCase();
            let referencia = "";
            let valoresEColunas = [];
            const properties = Object.getOwnPropertyNames(entity);
            properties.forEach((element, index) => {
                if (element === 'id') {
                    referencia = ` ${element} = ${Reflect.get(entity, element)}`;
                }
                else {
                    let valorCurrent = Reflect.get(entity, element);
                    if (typeof (valorCurrent) === 'string') {
                        valoresEColunas.push(` ${element} = "${valorCurrent}"`);
                    }
                    if (typeof (valorCurrent) === 'number') {
                        valoresEColunas.push(`${element} = ${valorCurrent}`);
                    }
                }
            });
            try {
                const conn = new ConnectionMysql_1.ConnectionMysql();
                let query = conn.QueryUpdate(tabela, valoresEColunas, referencia);
                conn.init();
                const [results] = yield (yield conn.connection).execute(query);
                console.log('Registro atualizado com sucesso!');
                console.log('Resultado:', results);
                conn.close();
                console.log('Query executada no banco de dados: ' + query);
                return GenericResult_1.GenericResult.Sucess;
            }
            catch (err) {
                console.error(`${err}`);
                return GenericResult_1.GenericResult.Fail;
            }
        });
    }
}
exports.Generics = Generics;
//# sourceMappingURL=Generics.js.map