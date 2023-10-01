using Database.Generics.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task<string> Save(T entity)
        {
            throw new NotImplementedException();
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
