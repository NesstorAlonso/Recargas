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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SkuMovistarController : ControllerBase
    {
        private readonly string _connectionString;

        public SkuMovistarController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/SkuMovistar/mtdObtenerSkuMovistar
        [HttpGet("mtdObtenerSkuMovistar")]
        public async Task<ActionResult<List<SkuMovistar>>> mtdObtenerSkuMovistar()
        {
            SkuMovistarRepository _repository = new SkuMovistarRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuMovistar();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
