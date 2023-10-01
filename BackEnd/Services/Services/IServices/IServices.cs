using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services.IServices
{
    public interface IServices<T> where T : class
    {
        Task<string> Save(T entity);
        Task<string> Delete(T entity);
    }
}
