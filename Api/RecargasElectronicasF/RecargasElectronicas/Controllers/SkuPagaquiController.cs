using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SkuPagaquiController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuPagaquiController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //api/SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=%Flashmobile%
        [HttpGet("mtdSkuPagaqui_ObtenerSku")]
        public async Task<ActionResult<List<SkuPagaqui>>> mtdSkuPagaqui_ObtenerSku(string Nombre)
        {
            SkuPagaquiRepository _repository = new SkuPagaquiRepository(_connectionString);
            var response = await _repository.mtdSkuPagaqui_ObtenerSku(Nombre);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}
