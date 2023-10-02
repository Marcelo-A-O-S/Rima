using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services.IServices
{
    public interface IEmployeesRolesServices : IServices<EmployeeRoles>
    {
        Task<List<EmployeeRoles>> GetByEmployeeId(int employeeid);
    }
}
