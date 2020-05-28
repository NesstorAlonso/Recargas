using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SkuRecargaquiController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuRecargaquiController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%Flashmobile% %Cierto%
        [HttpGet("mtdSkuRecargaqui_ObtenerSku")]
        public async Task<ActionResult<List<SkuRecargaqui>>> mtdSkuRecargaqui_ObtenerSku(string name)
        {
            SkuRecargaquiRepository _repository = new SkuRecargaquiRepository(_connectionString);
            var response = await _repository.mtdSkuRecargaqui_ObtenerSku(name);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}
