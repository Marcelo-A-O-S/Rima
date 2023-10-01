using Api.Services.Interfaces;
using Bussines.Services.IServices;
using Domain.Entities;
using Domain.Enums;

namespace Api.Services
{
    public class CreateTypesRoles : ICreateTypesRoles
    {
        private readonly ITypesRolesServices typesRolesServices;

        public CreateTypesRoles(ITypesRolesServices typesRolesServices)
        {
            this.typesRolesServices = typesRolesServices;
        }
        public async Task Create()
        {
            foreach (var typeRoleName in Enum.GetValues(typeof(ETypesRoles)))
            {
                Console.WriteLine(typeRoleName.ToString().ToLower());
                var typeRole = new TypesRoles(0, typeRoleName.ToString());
                await this.typesRolesServices.Save(typeRole);
            }
            
        }
    }
}
