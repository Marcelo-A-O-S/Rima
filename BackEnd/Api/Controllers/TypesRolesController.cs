using Api.ViewModel.TypeRole;
using Bussines.Services.IServices;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesRolesController : ControllerBase
    {
        private readonly ITypesRolesServices typesRolesServices;

        public TypesRolesController(ITypesRolesServices typesRolesServices)
        {
            this.typesRolesServices = typesRolesServices;
        }
        [Authorize]
        [HttpGet, Route("GetTypes")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var list = await this.typesRolesServices.GetAll();
                return Ok(list);
            }
            catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpPost, Route("CreateType")]
        public async Task<ActionResult> Create(TypeRoleView request)
        {
            try
            {
                
                return Ok();
            }
            catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
