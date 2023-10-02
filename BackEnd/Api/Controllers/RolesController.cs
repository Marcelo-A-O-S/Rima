using Bussines.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRolesServices rolesServices;

        public RolesController(IRolesServices rolesServices)
        {
            this.rolesServices = rolesServices;
        }
        [HttpGet, Route("GetRoles")]
        public async Task<ActionResult> GetAll()
        {
            var listRoles = await this.rolesServices.GetAll();
            return Ok(listRoles);
        }
    }
}
