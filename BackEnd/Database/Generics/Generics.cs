using Database.Connection;
using Database.Generics.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Database.Generics
{
    public class Generics<T> : IGenerics<T> where T : class
    {
        public Generics()
        {

        }

        public async Task<List<T>> All()
        {
            Type type = typeof(T);
            var objCurrent = (T)Activator.CreateInstance(type);
            
            var objlist = new List<T>();
            var conn = new ConnectionMySql();
            string command = conn.QuerySelectAll(objCurrent.GetType().Name.ToLower());
            await conn.Init();
            await conn.InsertCommand(command);
            await conn.ExecuteReaderQuery();
            
            throw new NotImplementedException();
        }

        public async Task<bool> CheckPropertyValue(object verify, string NameProperty)
        {
            try
            {
                Type type = typeof(T);
                var value = "";
                var obj = (T)Activator.CreateInstance(type);
                var listobj = new List<T>();
                var Table = obj.GetType().Name.ToLower().ToString();
                var property = obj.GetType().GetProperty(NameProperty, BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);

                var conn = new ConnectionMySql();
                var command = conn.QueryCheckValueExists(Table.ToLower(), property.Name, verify.ToString());
                await conn.Init();
                await conn.InsertCommand(command);
                await conn.ExecuteReaderQuery();
                var result = await conn.ReturnUniqueReaderData();
                if(result != String.Empty)
                {
                    if(result.ToLower() == "true")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
           
        }

        public Task<string> Delete(T entity)
        {
            Type type = typeof(T);
            throw new NotImplementedException();
        }

        public async Task<T> FindBy(string NameProperty, object value)
        {
            Type type = typeof(T);
            var valueString = "";
            var objCurrent = (T)Activator.CreateInstance(type);
            var Table = objCurrent.GetType().Name.ToLower();
            var property = objCurrent.GetType().GetProperty(NameProperty,BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
            if(value.GetType() == typeof(string))
            {
                valueString = String.Format("'{0}'", value.ToString());
            }
            if(value.GetType() == typeof(int))
            {
                valueString = String.Format("{0}", value.ToString());
            }
            var conn = new ConnectionMySql();
            var command = conn.QuerySelectByProperty(Table,property.Name,valueString);
            await conn.Init();
            await conn.InsertCommand(command);
            await conn.ExecuteReaderQuery();
            objCurrent = await conn.FilterReaderObject<T>();
            await conn.CommandClose();
            await conn.ConnectClose();
            return (T)objCurrent;
        }

        public async Task Save(T entity)
        {
            try
            {
                var propriedades = entity.GetType().GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                var campos = new List<string>();
                var valores = new List<string>();
                foreach (var prop in propriedades)
                {
                    var atribute = prop.GetCustomAttribute(typeof(KeyAttribute))?.GetType().Name.Contains("KeyAttribute");
                    if (atribute != true)
                    {
                        campos.Add(prop.Name);
                        if (prop.PropertyType == typeof(string))
                        {
                            valores.Add("'" + prop.GetValue(entity).ToString() + "'");
                        }
                        if (prop.PropertyType == typeof(int))
                        {
                            valores.Add(prop.GetValue(entity).ToString());
                        }
                        if (prop.PropertyType == typeof(byte[]))
                        {
                            var bitResult = (byte[])prop.GetValue(entity);
                            var valuebit = BitConverter.ToString(bitResult).Replace("-", "");
                            valores.Add($"UNHEX('" + valuebit + "')");
                        }

                    }
                }
                var conn = new ConnectionMySql();
                await conn.Init();
                var command = conn.QueryInsert(entity.GetType().Name.ToLower(), campos, valores);
                await conn.InsertCommand(command);
                await conn.ExecuteNonQuery();
                await conn.CommandClose();
                await conn.ConnectClose();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
        }

        public Task<T> SearchById(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<string> Update(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> VerifyExistsById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
