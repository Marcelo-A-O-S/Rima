using Api.ViewModel.Role;
using Bussines.Services.IServices;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRolesServices rolesServices;
        private readonly ITypesRolesServices typesRolesServices;

        public RolesController(
            IRolesServices rolesServices,
            ITypesRolesServices typesRolesServices
            )
        {
            this.rolesServices = rolesServices;
            this.typesRolesServices = typesRolesServices;
        }
        [Authorize]
        [HttpGet, Route("GetRoles")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var listRoles = await this.rolesServices.GetAll();
                return Ok(listRoles);
            }
            catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpGet, Route("GetRoleViews")]
        public async Task<ActionResult> GetAllRoleView()
        {
            try
            {
                var listRoles = await this.rolesServices.GetAll();
                var listRolesView = new List<RoleView>();
                foreach (var role in listRoles)
                {
                    var typerole = await this.typesRolesServices.GetById(role.typeid);
                    var roleView = new RoleView();
                    roleView.roleName = role.roleName;
                    roleView.typeName = typerole.typeName;
                    listRolesView.Add(roleView);
                }
                return Ok(listRolesView);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpPost, Route("CreateRole")]
        public async Task<ActionResult> Create(RoleCreateViewModel request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exists = await this.typesRolesServices.CheckValueTypeNameExists(request.typeName);
                    if(exists != false)
                    {
                        var typeRole = await this.typesRolesServices.GetByTypeName(request.typeName);
                        var role = new Roles(
                            id:0,
                            typeid:typeRole.id,
                            roleName:request.roleName
                            );
                        var result = await this.rolesServices.Save(role);
                        return Ok(result);
                    }
                    return BadRequest("Tipo inexistente!");
                }
                return BadRequest("Erro na validação das informações!");

            }catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
