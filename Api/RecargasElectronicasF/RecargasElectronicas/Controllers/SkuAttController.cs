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
    public class SkuAttController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuAttController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/SkuAtt/mtdObtenerSkuAtt
        [HttpGet("mtdObtenerSkuAtt")]
        public async Task<ActionResult<List<SkuAtt>>> mtdObtenerSkuUnefon()
        {
            SkuAttRepository _repository = new SkuAttRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuAtt();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
