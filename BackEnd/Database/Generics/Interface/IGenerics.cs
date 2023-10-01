using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Generics.Interface
{
    public interface IGenerics<T> where T : class
    {
        Task<string> Save(T entity);
        Task<List<T>> All();
        Task<string> Update(T entity);
        Task<T> SearchById(int Id);
        Task<string> Delete(T entity);
        Task<bool> VerifyExistsById(int Id);
        Task<bool> CheckPropertyValue(string verify, string NameProperty);
    }
}
