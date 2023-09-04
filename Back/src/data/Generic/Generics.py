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
            await conn.execute(query);
            await conn.close();
            return "Inserido no banco com sucesso"
        except Error as e:
            print("Erro no banco de dados:", e.msg)
    async def List(self, tabela:str)->List[T]:
        try:
            conn = ConnectionMysql();
            await conn.init();
            value:T
            ListGeneric : List[T] = []
            query = conn.QuerySelectAll(tabela);
            await conn.execute(query);
            lista = conn.cursor.fetchall()
            await conn.close();
            propriedades =  [propriedade for propriedade in vars(value)]
            for linha in lista:
                for prop in propriedades:
                    setattr(value, prop, linha[prop])
                ListGeneric.append(value)

            return ListGeneric

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
            await conn.execute(query);
            await conn.close();
        except Error as e:
            print("Erro no banco de dados:", e.msg)
    async def FindById(self, tabela:str, id:int)-> T:
        try:
            conn = ConnectionMysql()
            conn.init()
            value:T;
            propriedades = [propriedade for propriedade in vars(value)];
            query = conn.QueryFindById(tabela, id);
            conn.execute(query);
            busca = conn.cursor.fetchall();
            conn.close();
            if busca.__len__() > 0:
                for valor in busca:
                    for prop in propriedades:
                        setattr(value, prop, valor[prop])
                return value
            else:
                return None
        except Error as err:
            return err;
    async def Delete(self, tabela:str, id:int)-> T:
        try:
            conn = ConnectionMysql();
            conn.init();
            query = conn.QueryDeleteById(tabela, id);
            conn.execute(query);
            conn.close();
        except Error as err:
            return err;
