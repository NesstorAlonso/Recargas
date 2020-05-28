using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SkuUnefonController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuUnefonController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/SkuUnefon/mtdObtenerSkuUnefon
        [HttpGet("mtdObtenerSkuUnefon")]
        public async Task<ActionResult<List<SkuUnefon>>> mtdObtenerSkuUnefon()
        {
            SkuUnefonRepository _repository = new SkuUnefonRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuUnefon();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
