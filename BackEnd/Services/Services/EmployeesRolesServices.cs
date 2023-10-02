using Bussines.Repository.IRepository;
using Bussines.Services.IServices;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services
{
    public class EmployeesRolesServices : IEmployeesRolesServices
    {
        private readonly IEmployeesRolesRepository employeesRolesRepository;

        public EmployeesRolesServices(IEmployeesRolesRepository employeesRolesRepository)
        {
            this.employeesRolesRepository = employeesRolesRepository;
        }

        public Task<string> Delete(EmployeeRoles entity)
        {
            throw new NotImplementedException();
        }

        public async Task<List<EmployeeRoles>> GetAll()
        {
            List<EmployeeRoles> employeeRoles = await this.employeesRolesRepository.All();
            return employeeRoles;
        }

        public async Task<List<EmployeeRoles>> GetByEmployeeId(int employeeid)
        {
            List<EmployeeRoles> employeeRoles = await this.employeesRolesRepository.FindAllBy("employeeid", employeeid);
            return employeeRoles;
        }

        public async Task<EmployeeRoles> GetById(int id)
        {
            EmployeeRoles employeeRoles = await this.employeesRolesRepository.SearchById(id);
            return employeeRoles;
        }

        public async Task<string> Save(EmployeeRoles entity)
        {
            if(entity.id == 0)
            {
                await this.employeesRolesRepository.Save(entity);
                return "Função salva com sucesso!";
            }
            else
            {
                await this.employeesRolesRepository.Update(entity);
                return "Função atualizada com sucesso!";
            }
        }
    }
}
