from typing import TypeVar, List
from mysql.connector import errors, Error
from data.Connection.ConnectionMysql import ConnectionMysql
T = TypeVar('T');

class BaseGenerics:
    def __init__(self) -> None:
        super().__init__()
    async def Save(self, value: T)->T:
        try:
            conn = ConnectionMysql();
            await conn.init();
            valores = [];
            campos = [];
            tabela = value.__class__.__name__.lower();
            colunas:str = ""
            values = ""
            propriedades = [propriedade for propriedade in vars(value)];
            for prop in propriedades:
                campos.append(prop);
                value_param = getattr(value, prop)
                if type(value_param) == str:
                    valores.append('"{}"'.format(value_param));
                elif type(value_param) == int:
                    valores.append(value_param)
                elif type(value_param) == bytes:
                    valor_byte = value_param.hex()
                    valores.append('"{}"'.format(valor_byte))
            for i in range(len(campos)):
                colunas += "{},".format(campos[i]);
                if type(valores[i]) == str:
                    string: str = valores[i]
                    values += '{}'.format(string)
                    values += ",";
                else:
                    values += "{},".format(valores[i]);
            query = conn.QueryInsert(tabela, colunas, values);
            await conn.executeAndCommit(query);
            await conn.close();
            return "Inserido no banco com sucesso"
        except Error as e:
            print("Erro no banco de dados:", e.msg)
    async def List(self, tabela:str):
        try:
            lista: list = [];
            conn = ConnectionMysql();
            await conn.init();
            query = conn.QuerySelectAll(tabela);
            await conn.execute(query);
            lista = conn.cursor.fetchall()
            await conn.close();
            return lista

        except Error as err:
            print("Erro no banco de dados:", err.msg)
    async def Update(self, value: T)-> T:
        try:
            conn = ConnectionMysql()
            await conn.init();
            colunas = [];
            valores = [];
            tabela = value.__class__.__name__.lower();
            referencia = ""
            identificador = "";
            valor_identificador = "";
            corpo = ""
            propriedades = [propriedade for propriedade in vars(value)];
            for prop in propriedades:
                if prop.lower() == 'id':
                    identificador = prop;
                    valor_identificador = getattr(value, prop);
                else:
                    colunas.append(prop);
                    value_param = getattr(value, prop);
                    if type(value_param) == str:
                        valores.append('"{}"'.format(value_param))

            for i in range(colunas.__len__()):
                corpo += ' {} = {},'.format(colunas[i], valores[i])

            referencia = '{} = {}'.format(identificador, valor_identificador)
            query = conn.QueryUpdate(tabela,corpo,referencia);
            await conn.executeAndCommit(query);
            await conn.close();
        except Error as e:
            print("Erro no banco de dados:", e.msg)
    async def FindById(self, tabela:str, id:int):
        try:
            conn = ConnectionMysql();
            await conn.init();
            query = conn.QueryFindById(tabela, id);
            await conn.execute(query);
            busca = conn.cursor.fetchall();
            await conn.close();
            return busca;
        except Error as err:
            return err;
    async def Delete(self, tabela:str, id:int)-> T:
        try:
            conn = ConnectionMysql();
            await conn.init();
            query = conn.QueryDeleteById(tabela, id);
            await conn.executeAndCommit(query);
            await conn.close();
        except Error as err:
            return err;
    async def CheckPerProperty(self, tabela: str, property:str, value:any):
        try:
            value_param: str;
            if(type(value) == str):
                value_param = '"{}"'.format(value);
            elif type(value) == int:
                value_param = '{}'.format(value);
            elif type(value) == float:
                value_param = '{}'.format(value);
            conn = ConnectionMysql();
            await conn.init();
            query = conn.VerifyValueByPropertyExists(tabela, property, value_param);
            await conn.execute(query);
            resultado = conn.cursor.fetchall();
            await conn.close();
            for item in resultado:
                if item['resultado'] == 'True':
                    return True
                return False


        except Error as err:
            print(err);
    async def FindBy(self, tabela:str, property:str, value:any):
        try:
            value_param: str;
            if(type(value) == str):
                value_param = '"{}"'.format(value);
            elif type(value) == int:
                value_param = '{}'.format(value);
            elif type(value) == float:
                value_param = '{}'.format(value);
            conn = ConnectionMysql();
            await conn.init();
            query = conn.QuerySelectByProperty(tabela, property, value_param);
            await conn.execute(query);
            resultado = conn.cursor.fetchall();
            await conn.close();
            for item in resultado:
                return item

        except Error as err:
            print(err)
    async def FindAllBy(self, tabela:str, property:str, value:any):
        try:
            lista : list = []
            value_param: str;
            if(type(value) == str):
                value_param = '"{}"'.format(value);
            elif type(value) == int:
                value_param = '{}'.format(value);
            elif type(value) == float:
                value_param = '{}'.format(value);
            conn = ConnectionMysql();
            await conn.init();
            query = conn.QuerySelectByProperty(tabela, property, value_param);
            await conn.execute(query);
            lista = conn.cursor.fetchall();
            await conn.close();
            return lista;
        except Error as err:
            print(err);
    async def CheckExistsEntityWithId(self, value: T):
        try:
            tabela = value.__class__.__name__.lower();
            id_column = "";
            other_column = "";
            propriedades = [propriedade for propriedade in vars(value)]
            for prop in propriedades:
                if prop.lower() == "id":
                    id_column = ' {} = {}'.format(prop, getattr(value,prop))
                else:
                    value_column = getattr(value, prop);
                    if type(value_column) == str:
                        other_column += ' and {} = "{}"'.format(prop, value_column);
                    else:
                        other_column += ' and {} = {}'.format(prop, value_column);
            values = '{} {}'.format(id_column, other_column);
            conn = ConnectionMysql();
            await conn.init();
            query = conn.VerifyEntity(tabela, values);
            await conn.execute(query);
            resultado = conn.cursor.fetchall();
            await conn.close();
            for item in resultado:
                if item['resultado'] == "True":
                    return True;
                else:
                    return False;
            return False;
        except Error as err:
            print(err);
    async def CheckExistsEntity(self, value:T):
        try:
            tabela = value.__class__.__name__.lower();
            referencies = "";
            propriedades = [propriedade for propriedade in vars(value)];
            for prop in propriedades:
                if prop.lower() != "id":
                    value_column = getattr(value, prop);
                    if type(value_column) == str:
                        referencies += ' {} = "{}",'.format(prop, getattr(value,prop));
                    else:
                        referencies += ' {} = {},'.format(prop, getattr(value,prop));
            referencies = referencies.rstrip(referencies[-1]);
            referencies = referencies.replace(',',' and');
            conn = ConnectionMysql();
            await conn.init();
            query = conn.VerifyValueByPropertiesExists(tabela,referencies)
            await conn.execute(query);
            resultado = conn.cursor.fetchall();
            await conn.close();
            for item in resultado:
                if item['resultado'] == "True":
                    return True;
                else:
                    return False;
            return False;

        except Error as err:
            print(err)
