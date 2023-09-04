from data.Connection.ConnectionMysql import ConnectionMysql;
from data.Generic.Generics import BaseGenerics;

async def InitializeDatabase():
    conn = ConnectionMysql();
    await conn.verifyDatabaseExists();
