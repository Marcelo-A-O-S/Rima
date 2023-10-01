using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services.IServices
{
    public interface ITypesRolesServices : IServices<TypesRoles>
    {
        
        Task<bool> CheckValueTypeNameExists(string typeName);
    }
}
