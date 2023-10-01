using Api.Services.Interfaces;
using Bussines.Services.IServices;
using Domain.Attributes;
using Domain.Entities;
using Domain.Enums;
using System.Reflection;

namespace Api.Services
{
    public class InitializeUserAdmin : IInitializeUserAdmin
    {
        private readonly IUsersServices usersServices;
        private readonly IEmployeesServices employeesServices;
        private readonly IEmployeesRolesServices employeesRolesServices;
        private readonly IRolesServices rolesServices;

        public InitializeUserAdmin(IUsersServices usersServices, 
            IEmployeesServices employeesServices,
            IEmployeesRolesServices employeesRolesServices,
            IRolesServices rolesServices
            )
        {
            this.usersServices = usersServices;
            this.employeesServices = employeesServices;
            this.employeesRolesServices = employeesRolesServices;
            this.rolesServices = rolesServices;
        }
        public async Task Create()
        {
            var exists = await this.usersServices.verifyEmailExists("administrador@admin.com");
            if(exists != true)
            {
                Roles role;
                TypesRoles typerole;
                var employee = new Employees(0, "Admin", "Adiministrador");
                await employee.GenerateCode();
                await this.employeesServices.Save(employee);
                employee = await this.employeesServices.GetByCode(employee.GetCode());
                var user = new Users(0,employee.id, "administrador@admin.com");
                await user.createPasswordHash("123456");
                await this.usersServices.Save(user);
                var roleAdmin = ERoles.Admin.GetType().GetField(ERoles.Admin.ToString()).GetCustomAttribute<StringValueAttribute>();
                exists = await this.rolesServices.CheckValueRoleNameExists(roleAdmin.Value);
                if (exists == true)
                {
                    role = await this.rolesServices.GetRoleByRoleName(roleAdmin.Value);
                    var employeeRole = new EmployeeRoles(0, employee.id, role.id);
                    await this.employeesRolesServices.Save(employeeRole);
                }
            }
        }
    }
}
