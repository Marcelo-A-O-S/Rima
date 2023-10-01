using Api.Services.Interfaces;
using Bussines.Services.IServices;
using Domain.Attributes;
using Domain.Entities;
using Domain.Enums;
using System.Reflection;
using System.Security.Cryptography;

namespace Api.Services
{
    public class CreateRoles : ICreateRoles
    {
        private readonly IRolesServices rolesServices;

        public CreateRoles(IRolesServices rolesServices)
        {
            this.rolesServices = rolesServices;
        }
        public async Task Create()
        {
            foreach(var role in Enum.GetValues(typeof(ERoles)))
            {
                Roles roles;
                MemberInfo memberInfo = role.GetType().GetMember(role.ToString()).FirstOrDefault();
                var stringValueAttribute = memberInfo.GetCustomAttribute<StringValueAttribute>();
                var exists = await this.rolesServices.CheckValueRoleNameExists(stringValueAttribute.Value);
                if(exists != true)
                {
                    if (stringValueAttribute.Value == "Gestor(a)" ||
                    stringValueAttribute.Value == "Adiministrador(a)" ||
                    stringValueAttribute.Value == "Desenvolvedor(a)" ||
                    stringValueAttribute.Value == "Secretário(a)"
                    )
                    {
                        roles = new Roles(0, stringValueAttribute.Value, 2);
                        await this.rolesServices.Save(roles);
                    }
                    else
                    {
                        roles = new Roles(0, stringValueAttribute.Value, 1);
                        await this.rolesServices.Save(roles);
                    }
                }
                
            }
        }
    }
}
