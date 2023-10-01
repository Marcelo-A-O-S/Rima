using Bussines.Repository;
using Bussines.Repository.IRepository;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services
{
    public class TypesRolesServices 
    {
        private readonly TypesRolesRepository typesRolesRepository;

        public TypesRolesServices(TypesRolesRepository typesRolesRepository)
        {
            this.typesRolesRepository = typesRolesRepository;
        }
        public async Task<string> Save(TypesRoles typesRoles)
        {
            try
            {
                if(typesRoles.id == 0)
                {
                    await this.typesRolesRepository.Save(typesRoles);
                    return "Salvo com sucesso!";
                }
                else
                {
                    await this.typesRolesRepository.Update(typesRoles);
                    return "Atualizado com sucesso";
                }

            }catch(Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task<string> Delete(TypesRoles typesRoles)
        {
            await this.typesRolesRepository.Delete(typesRoles);
            return "Deletado com sucesso!";
        }
    }
}
