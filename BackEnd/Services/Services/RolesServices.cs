using Bussines.Repository;
using Bussines.Services.IServices;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services
{
    public class RolesServices : IRolesServices
    {
        private readonly RolesRepository rolesRepository;

        public RolesServices(RolesRepository rolesRepository)
        {
            this.rolesRepository = rolesRepository;
        }

        public Task<string> Delete(Roles roles)
        {
            throw new NotImplementedException();
        }

        public async Task<string> Save(Roles roles)
        {
            try
            {
                if (roles.id == 0)
                {
                    await this.rolesRepository.Save(roles);
                    return "Salvo com sucesso!";
                }
                else
                {
                    await this.rolesRepository.Update(roles);
                    return "Atualizado com sucesso";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
