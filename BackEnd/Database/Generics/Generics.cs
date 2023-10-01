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

        public Task<List<T>> All()
        {
            throw new NotImplementedException();
        }

        public Task<bool> CheckPropertyValue(string verify, string NameProperty)
        {
            throw new NotImplementedException();
        }

        public Task<string> Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task Save(T entity)
        {
            try
            {
                var propriedades = entity.GetType().GetProperties();
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
