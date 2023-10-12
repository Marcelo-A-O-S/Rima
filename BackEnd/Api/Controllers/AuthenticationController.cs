using Api.Services.Interfaces;
using Api.ViewModel;
using Bussines.Services.IServices;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUsersServices usersServices;
        private readonly IEmployeesRolesServices employeesRolesServices;
        private readonly IEmployeesServices employeesServices;
        private readonly IRolesServices rolesServices;
        private readonly IJwtToken token;

        public AuthenticationController(
            IUsersServices usersServices, 
            IEmployeesRolesServices employeesRolesServices,
            IEmployeesServices employeesServices,
            IRolesServices rolesServices,
            IJwtToken token
            )
        {
            this.usersServices = usersServices;
            this.employeesRolesServices = employeesRolesServices;
            this.employeesServices = employeesServices;
            this.rolesServices = rolesServices;
            this.token = token;
        }
        [HttpPost, Route("Login")]
        public async Task<ActionResult> Login(LoginViewModel login)
        {
            if(ModelState.IsValid)
            {
                var exists = await this.usersServices.verifyEmailExists(login.email);
                if(exists != false)
                {
                    var user = await this.usersServices.GetByEmail(login.email);
                    exists = await user.verifyPassword(login.password);
                    if(exists != false)
                    {
                        var role = new Roles();
                        var userview = new UserViewModel();
                        userview.roles = new List<Roles>();
                        var employee = await this.employeesServices.GetById(user.employeeid);
                        var employeesRoles = await this.employeesRolesServices.GetByEmployeeId(employee.id);
                        foreach (var employeeRole in employeesRoles)
                        {
                            role = await this.rolesServices.GetById(employeeRole.roleid);
                            userview.roles.Add(role);
                        }
                        userview.firstName = employee.firstName;
                        userview.lastName = employee.lastName;
                        userview.email = user.email;
                        userview.token = await token.CreateJwtTokenAsync(userview);
                        return Ok(userview);

                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            return BadRequest("Erro nas credenciais passadas, corrija para prosseguir!");
        }
    }
}
