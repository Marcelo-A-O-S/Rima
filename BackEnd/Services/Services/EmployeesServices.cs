using Bussines.Repository;
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
    public class EmployeesServices : IEmployeesServices
    {
        private readonly IEmployeesRepository employeesRepository;

        public EmployeesServices(IEmployeesRepository employeesRepository)
        {
            this.employeesRepository = employeesRepository;
        }

        public Task<string> Delete(Employees entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Employees> GetByCode(string code)
        {
            Employees employee  = await this.employeesRepository.FindBy("code", code);
            return employee;
        }

        public async Task<string> Save(Employees entity)
        {
            if (entity.id == 0)
            {
                await this.employeesRepository.Save(entity);
                return "Funcionário salva com sucesso!";
            }
            else
            {
                await this.employeesRepository.Update(entity);
                return "Funcionário atualizada com sucesso!";
            }
        }
        
    }
}
