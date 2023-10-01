using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesRolesController : ControllerBase
    {
        public TypesRolesController()
        {

        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok();
        }
    }
}
