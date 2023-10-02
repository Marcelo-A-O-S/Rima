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
    public class TypesRolesServices : ITypesRolesServices
    {
        private readonly ITypesRolesRepository typesRolesRepository;

        public TypesRolesServices(ITypesRolesRepository typesRolesRepository)
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

        public async Task<bool> CheckValueTypeNameExists(string typeName)
        {
            var result = await this.typesRolesRepository.CheckPropertyValue(typeName, "typeName");
            return result;
        }

        public async Task<TypesRoles> GetById(int id)
        {
            TypesRoles typeRole = await this.typesRolesRepository.SearchById(id);
            return typeRole;
        }

        public async Task<List<TypesRoles>> GetAll()
        {
            List<TypesRoles> typesRoles = await this.typesRolesRepository.All();
            return typesRoles;
        }
    }
}
