using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services.IServices
{
    public interface ITypesRolesServices
    {
        Task<string> Save(TypesRoles typesroles);
        Task<string> Delete(TypesRoles typesroles);
    }
}
