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
    public class SkuTelcelController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuTelcelController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/SkuTelcel/mtdSkuPagatae_ObtenerSku?Sku=%INT% =001% =%PA%
        [HttpGet("mtdSkuPagatae_ObtenerSku")]
        public async Task<ActionResult<List<SkuTelcel>>> mtdSkuPagatae_ObtenerSku(string Sku)
        {
            SkuTelcelRepository _repository = new SkuTelcelRepository(_connectionString);
            var response = await _repository.mtdSkuPagatae_ObtenerSku(Sku);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}